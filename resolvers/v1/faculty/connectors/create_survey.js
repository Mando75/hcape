import {axiosQualtrics} from "../../../qualtrics";

/**
 * Calls the Qualtrics API to copy a 
 * @param instructor_id
 * @param survey_name
 * @returns {Promise<*>}
 */
export const copyQualtricsSurvey = async (instructor_id, survey_name) => {
    const masterSurvey = process.env.MASTER_SURVEY;
    return await axiosQualtrics.post('/surveys', {
        projectName: survey_name
    }, {
        headers: {
            "X-COPY-SOURCE": masterSurvey,
            "X-COPY-DESTINATION-OWNER": instructor_id,
        }
    }).data.result.id;
};

