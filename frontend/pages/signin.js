import RequestReset from "../components/RequestReset";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import styled from "styled-components";

const GridStyles = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-gap: 2rem;
`;

export default function SiginInPage() {
	return (
		<>
			<GridStyles>
				<SignIn />
				<SignUp />
			</GridStyles>
			<RequestReset />
		</>
	);
}
