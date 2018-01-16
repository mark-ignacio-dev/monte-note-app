import * as React from 'react';
import Sidebar from './Sidebar/index';
import MainSection from './MainSection/index';
import ElectronMessager from '../../utils/electron-messaging/electronMessager';
import { GLOBAL_SEARCH } from '../../constants/index';

export interface Props {
    notebooks: string[];
}
export interface State {
    searchQuery: string;
}

export class HomePage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            searchQuery: ''
        };
    }

    // Adds tag on Enter key press
    handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        let searchQuery = this.state.searchQuery;
        console.log('search for: ' + searchQuery);
        ElectronMessager.sendMessageWithIpcRenderer(GLOBAL_SEARCH, searchQuery);
    }

    updateInputValue(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({searchQuery: e.target.value});
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <div className="row">
                    <div className="input-group input-group-sm mb-3 add-tags">
                        <input 
                            value={this.state.searchQuery}
                            onChange={e => this.updateInputValue(e)}
                            type="text"
                            className="form-control" 
                            aria-label="Small" 
                            placeholder="Search content" 
                            aria-describedby="inputGroup-sizing-sm"
                            onKeyPress={(e) => this.handleKeyPress(e)}
                        />
                    </div>
                </div>
                <div className="row">
                    <Sidebar notebooks={['about', 'note-2', 'note-3']} />
                    <MainSection />
                    <div className="col-sm">
                        <h1>Preview Note Content</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;
