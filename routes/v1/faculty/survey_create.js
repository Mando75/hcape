/**
 * @author Bryan Muller
 * TODO: Route is incomplete
 * Create new Qualtrics survey from master template
 */
 import express from 'express';
 import {copyQualtricsSurvey} from "../../../resolvers/v1/faculty/connectors/create_survey";

 const sanitize = require('sanitizer').sanitize;
 const router = express.Router();

 router.route('/')
 /**
 *
 */
.
get(async (req, res) => {

});