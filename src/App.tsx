import { RecoilRoot } from 'recoil'
import SearchResults from './frontend/presenters/searchResultsPresenter';
import TestHeader from './frontend/testHeader';

function App() {
	return (
		<div id="app" className="w-full h-full bg-[#212f45] flex flex-col">
			<TestHeader></TestHeader>
			<SearchResults></SearchResults>
		</div>
	)
}

export default App;