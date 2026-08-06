const forgotPasswordTemplate = ({name, otp}) => {
    return `
        <p>Hello ${name},</p>
        <p>You have requested to reset your password. Please use the following OTP to proceed:</p>
        <h2>${otp}</h2>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
    `;
};

export default forgotPasswordTemplate;