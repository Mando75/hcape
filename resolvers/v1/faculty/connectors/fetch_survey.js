import {axiosQualtrics} from "../../../qualtrics";
import {parseSurveyMeta, parseSurveyQuestions} from "../helpers/parse_survey";

export const getQualtricsSurvey = async (survey_id) => {
  try {
    const survey = (await axiosQualtrics.get(`/surveys/${survey_id}`)).data;
    const parsedSurvey = {
      meta: parseSurveyMeta(survey.result),
      questions: parseSurveyQuestions(survey.result)
    };
    return {
      status: 200,
      data: parsedSurvey
    }
  } catch (error) {
    return {
      status: error.response.status,
      error: error.response.statusText
    }
  }
};