export const isResumeUploadEnabled = (): boolean => {
    return process.env.NEXT_PUBLIC_ENABLE_RESUME_UPLOAD === 'true';
};
