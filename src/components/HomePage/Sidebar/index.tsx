import * as React from 'react';
import { Link } from 'react-router-dom';
import { ElectronMessager } from '../../../utils/electron-messaging/electronMessager';
import { GET_NOTEBOOKS, TRASHCAN } from '../../../constants/index';
// import NewNotebookButton from './NewNotebookButton';
// import TagList from './TagList/index';

export interface Props {
    notebooks: string[];
    goToRoute: Function;
    allTags: string[];
    updateSelectedTags: Function;
    searchQuery: string;
    selectedNotebook: string;
}

export class Sidebar extends React.Component<Props, {}> {

    componentWillMount() {
        ElectronMessager.sendMessageWithIpcRenderer(GET_NOTEBOOKS);
    }

    componentDidMount() {
        $('.sidebar-notebooks-dropdown-sm')
        .add('.sidebar-notebooks-dropdown-md')
        .add('.sidebar-tags-dropdown-sm')
        .add('.sidebar-tags-dropdown')
        .add('.new-notebook-container-sm').on('click', function() {
            if ($(this).hasClass('sidebar-notebooks-dropdown-md')) {
                ($('#collapseNotebooksBigSidebar') as any).collapse('toggle')
            } else if ($(this).hasClass('new-notebook-container-sm')) {
                $('.tag-links-sm').hide();
                $('.sidebar-notebook-links-sm').hide();

                $('.new-notebook-sm').css('display') === 'block' ? 
                $('.new-notebook-sm').hide() :
                $('.new-notebook-sm').show();
            } else if ($(this).hasClass('sidebar-tags-dropdown-sm')) {
                $('.sidebar-notebook-links-sm').hide();
                $('.new-notebook-sm').hide();

                $('.tag-links-sm').css('display') === 'block' ? 
                $('.tag-links-sm').hide() :
                $('.tag-links-sm').show();
            } else if ($(this).hasClass('sidebar-notebooks-dropdown-sm')) {
                $('.tag-links-sm').hide();
                $('.new-notebook-sm').hide();

                $('.sidebar-notebook-links-sm').css('display') === 'block' ? 
                $('.sidebar-notebook-links-sm').hide() :
                $('.sidebar-notebook-links-sm').show();
            } else if ($(this).hasClass('sidebar-tags-dropdown')) {
                ($('#collapseTagsBigSidebar') as any).collapse('toggle');
            }
        });
    }

    render() {
        return (
            <React.Fragment>

                {/* <!-- Sidebar --> */}

                <div className="col-2 sidebar-container col-1-sidebar-container-sm">
                    <div className="sidebar">
                        <div className="sidebar-item sidebar-item-md">
                            <div className="sidebar-item-text-container">
                                <a 
                                    href="" 
                                    className="sidebar-item-text"
                                >Home <span className="sidebar-item-icon oi oi-home"/>
                                </a>
                            </div>
                        </div>

                        <div className="sidebar-item sidebar-item-sm">
                            <div className="sidebar-item-text-container sidebar-item-text-container-sm">
                                <a 
                                    href="" 
                                    className="sidebar-item-text"
                                ><span className="sidebar-item-icon sidebar-item-icon-sm oi oi-home"/>
                                </a>
                            </div>
                        </div>

                        <div className="sidebar-item sidebar-item-md">
                            <div className="sidebar-item-text-container">
                                <a 
                                    href="" 
                                    className="sidebar-item-text"
                                >New Notebook <span className="sidebar-item-icon oi oi-book"/>
                                </a>
                            </div>
                        </div>

                        <div className="sidebar-item sidebar-item-sm">
                            <div 
                                className="sidebar-item-text-container sidebar-item-text-container-sm new-notebook-container-sm"
                            >
                                <a 
                                    href="#newNotebook" 
                                    title="New Notebook" 
                                    className="sidebar-item-text"
                                ><span className="sidebar-item-icon sidebar-item-icon-sm oi oi-book"/>
                                </a>
                            </div>
                        </div>
        
                        {/* <!-- Notebooks Dropdown --> */}
                        <div className="sidebar-item sidebar-item-sm">
                            <div className="sidebar-item-text-container sidebar-notebooks-dropdown sidebar-notebooks-dropdown-sm sidebar-item-text-container-sm">
                                <a 
                                    className="sidebar-item-text" 
                                    title="Notebooks" 
                                    href="#collapseNotebooksSmallSidebar" 
                                    data-toggle="collapse" 
                                    aria-expanded="false" 
                                    aria-controls="collapseNotebooksSmallSidebar"
                                >
                                    <span className="sidebar-item-icon sidebar-item-icon-sm oi oi-layers"/>
                                </a>
                            </div>
                        </div>

                        <div className="sidebar-item">

                            <div className="sidebar-item-text-container sidebar-notebooks-dropdown sidebar-notebooks-dropdown-md sidebar-item-text-container-md">
                                <a 
                                    className="sidebar-item-text" 
                                    href="#collapseNotebooksBigSidebar" 
                                    data-toggle="collapse" 
                                    aria-expanded="false" 
                                    aria-controls="collapseNotebooksBigSidebar"
                                >Notebooks MD
                                <span className="sidebar-item-icon oi oi-chevron-left"/>
                                <span className="sidebar-item-icon oi oi-chevron-bottom"/>
                                </a>
                            </div>
                        
                            <div className="sidebar-collapse-content collapse" id="collapseNotebooksBigSidebar">
                                <ul className="sidebar-collapsed-content list-unstyled">
                                    {(this.props.notebooks as string[]).map((name: string) => {
                                        if (name !== TRASHCAN) {
                                            return (
                                                <Link
                                                        to={`/notebooks/${name}`}
                                                        key={name}
                                                        className="sidebar-item-link"
                                                >
                                                    <li className="sidebar-collapsed-item-text">
                                                            {name}
                                                    </li>
                                                </Link>
                                            );
                                        } else {
                                            return;
                                        }
                                    })}
                                </ul>
                            </div>
                        </div>
                        {/* <!-- /Notebooks Dropdown --> */}
        
                        {/* <!-- /Tags Dropdown --> */}
                        <div className="sidebar-item sidebar-item-sm">
                            <div className="sidebar-item-text-container sidebar-tags-dropdown-sm sidebar-item-text-container-sm">
                                <a 
                                    className="sidebar-item-text" 
                                    title="Tags" 
                                    href="#collapseTagsSmallSidebar"
                                >
                                    <span className="sidebar-item-icon sidebar-item-icon-sm oi oi-tags"/>
                                </a>
                            </div>
                        </div>
                        <div className="sidebar-item">

                            <div className="sidebar-item-text-container sidebar-item-text-container-md sidebar-tags-dropdown">
                                <a 
                                    className="sidebar-item-text" 
                                    href="#collapseTagsBigSidebar" 
                                    data-toggle="collapse" 
                                    aria-expanded="false"
                                    aria-controls="collapseTagsBigSidebar"
                                >Tags
                                <span className="sidebar-item-icon oi oi-chevron-left"/>
                                <span className="sidebar-item-icon oi oi-chevron-bottom"/>
                                </a>
                            </div>
            
                            <div className="sidebar-collapse-content collapse" id="collapseTagsBigSidebar">
                                <ul className="sidebar-collapsed-content list-unstyled">
                                    <li className="sidebar-collapsed-item-text">Tag 1</li>
                                    <li className="sidebar-collapsed-item-text">Tag 1</li>
                                    <li className="sidebar-collapsed-item-text">Tag 1</li>
                                    <li className="sidebar-collapsed-item-text">Tag 1</li>
                                    <li className="sidebar-collapsed-item-text">Tag 1</li>
                                    <li className="sidebar-collapsed-item-text">Tag 1</li>
                                    <li className="sidebar-collapsed-item-text">Tag 1</li>
                                    <li className="sidebar-collapsed-item-text">Tag 1</li>
                                    <li className="sidebar-collapsed-item-text">Tag 1</li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- /Tags Dropdown --> */}

                        {/* <!-- Trash --> */}
                        <div className="sidebar-item sidebar-item-md">
                            <div className="sidebar-item-text-container">
                                <a 
                                    href="" 
                                    className="sidebar-item-text"
                                >Trash <span className="sidebar-item-icon oi oi-trash"/></a>
                            </div>
                        </div>
        
                        <div className="sidebar-item sidebar-item-sm">
                            <div className="sidebar-item-text-container sidebar-item-text-container-sm">
                                <a 
                                    href="" 
                                    title="Trash" 
                                    className="sidebar-item-text"
                                ><span className="sidebar-item-icon sidebar-item-icon-sm oi oi-trash"/>
                                </a>
                            </div>
                        </div>
                        {/* <!-- /Trash --> */}
        
                    </div>
                </div>

                {/* <!-- Sidebar Extension for Medium & Small Devices --> */}
                <div className="col-2 sidebar-extension-sm sidebar-notebook-links-sm">
                    <div className="sidebar-collapse-content">
                        <ul className="sidebar-collapsed-content list-unstyled">
                            {(this.props.notebooks as string[]).map((name: string) => {
                                if (name !== TRASHCAN) {
                                    return (
                                        <Link
                                            to={`/notebooks/${name}`}
                                            key={name}
                                            className="sidebar-item-link"
                                        >
                                            <li className="sidebar-collapsed-item-text">
                                                {name}
                                            </li>
                                        </Link>
                                    );
                                } else {
                                    return;
                                }
                            })}
                        </ul>
                    </div>
                </div>
                <div className="col-2 sidebar-extension-sm sidebar-links-sm tag-links-sm">
                    <div className="sidebar-collapse-content">
                        <ul className="sidebar-collapsed-content list-unstyled">
                            <li className="sidebar-collapsed-item-text">Tag 1</li>
                            <li className="sidebar-collapsed-item-text">Tag 1</li>
                            <li className="sidebar-collapsed-item-text">Tag 1</li>
                            <li className="sidebar-collapsed-item-text">Tag 1</li>
                            <li className="sidebar-collapsed-item-text">Tag 1</li>
                            <li className="sidebar-collapsed-item-text">Tag 1</li>
                            <li className="sidebar-collapsed-item-text">Tag 1</li>
                            <li className="sidebar-collapsed-item-text">Tag 1</li>
                            <li className="sidebar-collapsed-item-text">Tag 1</li>
                        </ul>
                    </div>
                </div>

                {/* <!-- Add Notebook Extension --> */}
                <div className="col-2 sidebar-extension-sm sidebar-links-sm new-notebook-sm">
                    <div className="sidebar-collapse-content">
                        <div className="input-group input-group-sm mb-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                aria-label="Small" 
                                aria-describedby="inputGroup-sizing-sm"
                            />
                        </div>
                    </div>
                </div>
                {/* <!-- /Add Notebook Extension --> */}

                {/* <!-- /Sidebar Extension for Medium & Small Devices --> */}

                {/* <!-- Navbar for Smallest Devices --> */}
                <div className="col-12 navbar-sm-container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="#">Logo</a>
                        <form className="form-inline search-sm">
                            <input 
                                className="form-control search-notes" 
                                type="search" 
                                placeholder="Search" 
                                aria-label="Search"
                            />
                        </form>
                        <button 
                            className="navbar-toggler" 
                            type="button" 
                            data-toggle="collapse" 
                            data-target="#navbarNavDropdown" 
                            aria-controls="navbarNavDropdown"
                            aria-expanded="false" 
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Home
                                        <span className="sr-only">(current)</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">New Notebook</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a 
                                        className="nav-link dropdown-toggle" 
                                        href="#" 
                                        id="navbarDropdownNotebooksLink" 
                                        data-toggle="dropdown" 
                                        aria-haspopup="true" 
                                        aria-expanded="false"
                                    >
                                        Notebooks
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownNotebooksLink">
                                        <ul className="sidebar-collapsed-content list-unstyled">
                                            {(this.props.notebooks as string[]).map((name: string) => {
                                                if (name !== TRASHCAN) {
                                                    return (
                                                        <Link
                                                            to={`/notebooks/${name}`}
                                                            key={name}
                                                            className="dropdown-item"
                                                        >
                                                                {name}
                                                        </Link>
                                                    );
                                                } else {
                                                    return;
                                                }
                                            })}
                                        </ul>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <a 
                                        className="nav-link dropdown-toggle" 
                                        href="#" 
                                        id="navbarDropdownTagsLink" 
                                        data-toggle="dropdown" 
                                        aria-haspopup="true" 
                                        aria-expanded="false"
                                    >
                                        Tags
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownTagsLink">
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Trash</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                {/* <!-- /Navbar for Smallest Devices --> */}

                {/* <!-- /Sidebar --> */}

                {/* <div className="col-2 trashcan sidebar">
                    <section className="notebooks">
                        <section className="trashcan">
                            <ul className="list-group notes">
                                <NewNotebookButton 
                                    goToRoute={this.props.goToRoute} 
                                    notebooks={this.props.notebooks} 
                                />
                            </ul>
                        </section>
                
                        <div 
                            className="notebook-name-sidebar" 
                            data-toggle="collapse" 
                            data-target="#collapseExample" 
                            aria-expanded="false"
                        >
                            Notebooks
                            <span className="oi oi-chevron-bottom expand-notebook" />
                            <span className="oi oi-chevron-left expand-notebook" />
                        </div>
                        <div className="collapse notes-sidebar" id="collapseExample">
                            <ul className="list-group notes">
                                {(this.props.notebooks as string[]).map((name: string) => {
                                    if (name !== TRASHCAN) {
                                        return (
                                        <Link 
                                            to={`/notebooks/${name}`} 
                                            key={name}
                                        >
                                            <li className="list-group-item sidebar-note">{name}</li>
                                        </Link>
                                        );
                                    } else {
                                        return;
                                    }
                                })}
                            </ul>
                        </div>
                        <TagList 
                            allTags={this.props.allTags} 
                            updateSelectedTags={this.props.updateSelectedTags}
                            searchQuery={this.props.searchQuery}
                            selectedNotebook={this.props.selectedNotebook}
                        />
                    </section>
                
                    <section className="trashcan">
                        <ul className="list-group notes">
                            <Link 
                                to={'/trashcan'} 
                            >
                                <li 
                                    className="list-group-item sidebar-note sidebar-link"
                                >Trash <span className="oi oi-trash trashcan" />
                                </li>
                            </Link>
                        </ul>
                    </section>
                
                </div>
                            */}
            </React.Fragment>
        );
    }
}

export default Sidebar;