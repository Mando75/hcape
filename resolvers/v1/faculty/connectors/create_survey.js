/**
 * @author Bryan Muller
 */
import {axiosQualtrics} from "../../../qualtrics";

/**
 * Calls the Qualtrics API to make a new copy of the master Qualtrics survey
 * @param instructor_id - Qualtrics ID of the owner of the new survey
 * @param survey_name - What to call the new survey
 * @returns Id of new survey (Promise)
 */
export const copyQualtricsSurvey = async (instructor_id, survey_name) => {
    // Id of the Master Survey template to be used
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

