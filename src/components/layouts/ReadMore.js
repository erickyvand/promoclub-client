import React, { useState } from 'react';
import Linkify from 'react-linkify';

const ReadMore = ({ text, maxShowCharacter }) => {
	const post = text === null ? '' : text;
	const [isTruncate, setIsTruncate] = useState(true);

	const resultString = isTruncate ? post.slice(0, maxShowCharacter) : text;

	const handleShowMore = () => {
		setIsTruncate(!isTruncate);
	};

	return (
		<div>
			<p>
				<Linkify>{resultString}</Linkify>
				{resultString.length >= maxShowCharacter ? (
					<span
						onClick={handleShowMore}
						style={{ color: '#126eb0', cursor: 'pointer' }}
					>
						{isTruncate ? '...read more' : 'show less'}
					</span>
				) : (
					''
				)}
			</p>
		</div>
	);
};

export default ReadMore;
