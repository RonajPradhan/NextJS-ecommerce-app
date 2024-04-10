import RequestReset from "../components/RequestReset";
import Reset from "../components/Reset";

export default function ResetPage({ query }) {
	if (!query.token) {
		return (
			<div>
				Sorry you must supply a token!
				<RequestReset />
			</div>
		);
	}
	return (
		<div>
			<p>RESET YOUR PASSWORD {query.token}</p>
			<Reset token={query.token} />
		</div>
	);
}
