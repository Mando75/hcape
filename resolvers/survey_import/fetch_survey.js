import {axiosQualtrics} from "../../lib/qualtrics";
import {parse_survey_questions, parse_survey_meta} from "../../lib/parse_survey";

export const fetch_qualtrics_survey_data = async (survey_id) => {
  try {
    const survey = (await axiosQualtrics.get(`/surveys/${survey_id}`)).data;
    const parsedSurvey = {
      meta: parse_survey_meta(survey.result),
      questions: parse_survey_questions(survey.result)
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