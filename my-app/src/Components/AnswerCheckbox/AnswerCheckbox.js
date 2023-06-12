
/*Answer Component
given the database, we want to grab the answer from that database, this database will be hard coded and in an array
we want to display the answer in a checkbox format
we want to be able to select only one answer at a time, when the user selects a new answer, the previous answer should be unselected
*/

import React from 'react';
import { Checkbox } from 'primereact/checkbox';

export default function AnswerCheckbox(props) {
    const { quizQuestions } = props;

    return (
        <div>
            <h1>AnswerCheckbox</h1>
            <Checkbox value={quizQuestions[0].answer}/>
            <label>{quizQuestions[0].answer}</label>

        </div>
    )

}

