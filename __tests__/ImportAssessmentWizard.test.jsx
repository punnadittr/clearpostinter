import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImportAssessmentWizard from '../components/ImportAssessmentWizard';

// Mock useRouter
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: mockPush,
            replace: jest.fn(),
        };
    },
}));

// Mock Supabase
const mockUpload = jest.fn();
const mockGetPublicUrl = jest.fn();
const mockInsert = jest.fn();

jest.mock('../lib/supabase', () => ({
    supabase: {
        storage: {
            from: () => ({
                upload: mockUpload,
                getPublicUrl: mockGetPublicUrl,
            }),
        },
        from: () => ({
            insert: mockInsert,
        }),
    },
}));

// Mock global fetch
global.fetch = jest.fn();

// Mock URL.createObjectURL for file preview
global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

describe('ImportAssessmentWizard Integration', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Default happy path mocks
        mockUpload.mockResolvedValue({ data: {}, error: null });
        mockGetPublicUrl.mockReturnValue({ data: { publicUrl: 'https://example.com/file.jpg' } });
        mockInsert.mockResolvedValue({ data: {}, error: null });
        global.fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({}),
        });
    });

    it('validates step 1 and blocks navigation if empty', async () => {
        render(<ImportAssessmentWizard />);

        const nextButton = screen.getByText(/Next Step/i);

        // Try to click next without filling anything
        fireEvent.click(nextButton);

        // Expect validation errors (checking for "required" messages)
        await waitFor(() => {
            expect(screen.getByText(/Full name is required/i)).toBeInTheDocument();
            expect(screen.getByText(/WhatsApp number is required/i)).toBeInTheDocument();
        });

        // Should still be on "Contact Information"
        expect(screen.getByText('Contact Information')).toBeInTheDocument();
    });

    it('completes the full happy path submission flow', async () => {
        render(<ImportAssessmentWizard />);

        // --- STEP 1: Contact Info ---
        fireEvent.change(screen.getByPlaceholderText(/John Doe/i), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByPlaceholderText(/\+66 or your country code/i), { target: { value: '+66123456789' } });
        fireEvent.change(screen.getByPlaceholderText(/john@example.com/i), { target: { value: 'test@example.com' } });

        fireEvent.click(screen.getByText(/Next Step/i));

        // --- STEP 2: Shipment Details ---
        await waitFor(() => expect(screen.getByText('Shipment Details')).toBeInTheDocument());

        // Select Carrier
        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'thaipost' } });

        // Enter Description
        fireEvent.change(screen.getByPlaceholderText(/e.g., 5kg of Supplements/i), { target: { value: 'Vitamins' } });

        fireEvent.click(screen.getByText(/Next Step/i));

        // --- STEP 3: Current Status ---
        await waitFor(() => expect(screen.getByText('Current Status')).toBeInTheDocument());

        // Select Status (Radio) - "notification" corresponds to Thai Post
        const statusOption = screen.getByLabelText(/I received a "Collection Notification" slip/i);
        fireEvent.click(statusOption);

        // Select License Status (Radio) - "unknown"
        const licenseOption = screen.getByLabelText(/I don't know what is needed/i);
        fireEvent.click(licenseOption);

        fireEvent.click(screen.getByText(/Next Step/i));

        // --- STEP 4: Submit ---
        await waitFor(() => expect(screen.getByText('Upload Evidence')).toBeInTheDocument());

        // Select file (mock)
        const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
        // Input is hidden/absolute, so we query directly
        const fileInput = document.querySelector('input[type="file"]');

        // Mock alert to catch errors
        window.alert = jest.fn();

        // We can simulate upload if we want, or just verify submit works without it (optional)
        // Let's simulate it to cover that path
        // fireEvent.change(fileInput, { target: { files: [file] } });

        // Assuming the visual input is hidden, we target the input element directly. 
        // Our component actually renders a hidden input inside a label-like div. 
        // 'getByLabelText' might not find it if 'id' isn't set, so let's use selector.
        // Actually, the code has input type="file" inside a div, so we might need `container.querySelector`.

        // simpler approach: target by display value if label text doesn't work, 
        // or just fire event on the input found by type.
        // The component has: <p>Click to upload documents</p> ... <input type="file" ... />
        // Let's rely on standard getting by text for the verify, but for input:
        // const input = screen.getByDisplayValue(''); // No value initially

        // Let's verify the text is there
        expect(screen.getByText('Click to upload documents')).toBeInTheDocument();

        // Testing file upload interaction is complex in jsdom without userEvent.upload, 
        // checking the submission logic is main goal. We can skip actual file selection for Supabase test 
        // if we trust the logic, OR ensure we select it.
        // Let's try to submit without file first as files are optional.

        // Spy on console.error to trace execution
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        const submitButton = screen.getByText(/Submit Request/i);
        fireEvent.click(submitButton);

        // Check if we entered handleSubmit
        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('TEST DEBUG: Entering handleSubmit'));
        });

        // Check validation
        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('TEST DEBUG: Validation result:'), true);
        });

        // Check insert
        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('TEST DEBUG: Before insert'));
        });

        // Expect loading state
        await waitFor(() => expect(screen.getByText(/Processing.../i)).toBeInTheDocument());

        // --- VERIFY SUCCESS ---
        await waitFor(() => {
            if (window.alert.mock.calls.length > 0) {
                console.error('Alert called with:', window.alert.mock.calls[0][0]);
            }
            expect(screen.getByText(/Assessment Request Received!/i)).toBeInTheDocument();
        });

        // --- VERIFY BACKEND CALLS ---
        // 1. Database Insert
        expect(mockInsert).toHaveBeenCalledWith([
            expect.objectContaining({
                full_name: 'Test User',
                email: 'test@example.com',
                shipping_carrier: 'thaipost',
                current_status: 'notification',
                // evidence_url should be null or string depending on logic
            })
        ]);

        // 2. Email Send
        expect(global.fetch).toHaveBeenCalledWith('/api/email/send', expect.objectContaining({
            method: 'POST',
            body: expect.stringContaining('test@example.com'),
        }));
    });
});
