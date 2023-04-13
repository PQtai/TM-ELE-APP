const getRole = () => {
   let role = '';
   let infoRole = localStorage.getItem('role');
   if (typeof infoRole === 'string') {
      role = JSON.parse(infoRole);
   }
   return role;
};
export default getRole;
