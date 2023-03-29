const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
const priceRegex = /^(?=[1-9])\d{1,3}(,\d{3})*$/;
const phoneRegex = /^(03|05|07|08|09)+([0-9]{8})\b/;

export { emailRegex, phoneRegex, priceRegex };
