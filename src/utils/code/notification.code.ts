export const randomCode = () => {
  const alnum = '0123456789';
  const codeLength = 6;
  let randomstring = '';
  for (let i = 0; i < codeLength; i++) {
    const rnum = Math.floor(Math.random() * alnum.length);
    randomstring += alnum.substring(rnum, rnum + 1);
  }
  return randomstring;
};
