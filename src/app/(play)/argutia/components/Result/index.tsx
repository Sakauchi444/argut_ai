import React, { Dispatch, FC, SetStateAction } from "react";

type Props = {
	data: ArgutiaData | null;
	setPhase: Dispatch<SetStateAction<Phase>>;
};

const Result: FC<Props> = ({ data, setPhase }) => {
	return <div></div>;
};

export default Result;
