export const parseSurveyMeta =
    ({id, name, ownerId, creationDate}) =>
        ({id, name, ownerId, creationDate});

export const parseSurveyQuestions = ({questions}) => {
  const keys = Object.keys(questions);
  return keys.map((key) => {
    return {
      name: html_stripper(questions[key].questionName),
      text: html_stripper(questions[key].questionText)
    }
  });
};

export const html_stripper = (text) => {
  return text.replace(/(<(.|\n)*?>)|(\$(.|\n)*?})/g,'');
};