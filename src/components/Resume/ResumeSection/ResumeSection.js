// -----------------------------------------------
//
// ResumeSection -> ResumeSection.js
// Desc: ResumeSection Component to render the education
// or work experience of a user
//
// -----------------------------------------------

// -----------------------------------------------
// Imports

// React
import { React, useState } from 'react';

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Reusable
import ResumeRow from '../reusable/ResumeRow';
import ActionButton from '../reusable/ActionButton';
import AddForm from '../reusable/AddForm';
import SkillForm from '../reusable/SkillForm';
import ResumeSkill from '../reusable/ResumeSkill';
// -----------------------------------------------

function ResumeSection(props) {
	const {
		stateKeys,
		formLabels,
		h2Heading,
		buttonText,
		resumeSectionType,
		determineMode
	} = props;
	const [resumeData, setResumeData] = useState(stateKeys);
	const [formFlag, setFormFlag] = useState(false);
	const [resumeRows, setResumeRows] = useState([]);
	const [skillRows, setSkillRows] = useState([]);

	function handleFormState() {
		setFormFlag(!formFlag);
	}

	function handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		console.log({ name, value });
		setResumeData({
			...resumeData,
			[name]: value
		});
	}

	function onSubmit(event) {
		event.preventDefault();
		if (resumeSectionType === '1') {
			generateResumeRow();
		} else {
			generateSkillsRow();
		}
	}

	function generateSkillsRow() {
		const newSkillRow = (
			<ResumeSkill
				data={resumeData}
				stateKeys={stateKeys}
				formLabels={formLabels}
			/>
		);
		setSkillRows([...skillRows, newSkillRow]);
		handleFormState();
	}

	function showSkillsRows() {
		return skillRows.map((row) => {
			return row;
		});
	}

	function generateResumeRow() {
		const newResumeRow = (
			<ResumeRow
				data={resumeData}
				stateKeys={stateKeys}
				formLabels={formLabels}
			/>
		);
		setResumeRows([...resumeRows, newResumeRow]);
		handleFormState();
	}

	function showResumeRows() {
		return resumeRows.map((row) => {
			return row;
		});
	}

	function showResumeData() {
		if (resumeSectionType === '1') {
			return showResumeRows();
		} else {
			return showSkillsRows();
		}
	}

	function showForm() {
		if (formFlag) {
			if (resumeSectionType === '1') {
				return (
					<AddForm
						handleChange={handleChange}
						formLabels={formLabels}
						handleCancel={handleFormState}
						handleSubmit={onSubmit}
					/>
				);
			} else {
				return (
					<SkillForm
						handleChange={handleChange}
						formLabels={formLabels}
						handleCancel={handleFormState}
						handleSubmit={onSubmit}
					/>
				);
			}
		} else {
			return null;
		}
	}

	return (
		<Row>
			<Col>
				<h2>{h2Heading}</h2>

				{showResumeData()}

				{/* {formFlag && (
					<AddForm
						handleChange={handleChange}
						formLabels={formLabels}
						handleCancel={handleFormState}
						handleSubmit={onSubmit}
					/>
				)} */}
				{showForm()}

				{!formFlag && determineMode === 'Edit' && (
					<ActionButton
						text={buttonText}
						type=''
						onClickFunction={handleFormState}
					/>
				)}
			</Col>
		</Row>
	);
}

export default ResumeSection;
