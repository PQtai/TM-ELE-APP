const getUserId = () => {
   let userId = '';
   let infoLocal = localStorage.getItem('userId');
   if (typeof infoLocal === 'string') {
      userId = JSON.parse(infoLocal);
   }
   return userId;
};
export default getUserId;
