export const OPCODE = {
  SUCCESS: 1,
  FAILED: 0,
};

export const PHONE_REG = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;

export const BIRTH_REG = /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/;

export const RESPONSE_TEMPLATE = (success: boolean, message: string) => ({
  OPCODE: success ? OPCODE.SUCCESS : OPCODE.FAILED,
  message,
});
