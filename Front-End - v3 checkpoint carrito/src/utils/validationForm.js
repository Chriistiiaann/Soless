const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  
  const isValidPassword = (password) => {
    // Define los criterios de validación
    const minLength = 8; // Longitud mínima
    const hasUpperCase = /[A-Z]/.test(password); // Al menos una mayúscula
    const hasLowerCase = /[a-z]/.test(password); // Al menos una minúscula
    const hasNumbers = /\d/.test(password); // Al menos un número
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Al menos un carácter especial
  
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChars
    );
  };
  
  export const validation = {
    isValidEmail,
    isValidPassword,
  };