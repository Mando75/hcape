/**
 * Extracts login params from req body.
 * If one or more of the keys is undefined
 * @param body
 * @returns {*}
 */
export const extractLoginData = (body) => {
  try {
    return {
      username: body.username,
      password: body.pwd,
      type: body.type
    }
  } catch(e) {
    return null;
  }
};

export const loginMap = {
  student: () => console.log('student'),
  teacher: () => console.log('teacher')
};