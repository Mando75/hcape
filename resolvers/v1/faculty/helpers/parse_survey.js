/**
 * @author Bryan Muller
 */

/**
 * Given a survey object, return the specified key/values
 * @param id
 * @param name
 * @param ownerId
 * @param creationDate
 * @returns {{id: *, name: *, ownerId: *, creationDate: *}}
 */
export const parseSurveyMeta =
    ({id, name, ownerId, creationDate}) =>
        ({id, name, ownerId, creationDate});

/**
 * Parses survey question text, removing html
 * elements.
 * @param questions
 * @returns {{name: *, text: *}[]}
 */
export const parseSurveyQuestions = ({questions}) => {
  const keys = Object.keys(questions);
  return keys.map((key) => {
    return {
      name: html_stripper(questions[key].questionName),
      text: html_stripper(questions[key].questionText)
    }
  });
};

/**
 * Uses regex to remove html tags and attributes
 * from a string of text
 * @param text
 * @returns {*}
 */
export const html_stripper = (text) => {
  return text.replace(/(<(.|\n)*?>)|(\$(.|\n)*?})/g,'');
};