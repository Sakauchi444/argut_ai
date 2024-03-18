import { FC } from "react";

type Props = {
	params: { id: number };
};

const PostPage: FC<Props> = ({ params }) => {
	return <div>this is post {params.id} page.</div>;
};

export default PostPage;
