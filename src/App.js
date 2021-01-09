import React, {useEffect, useState} from "react";
import {loadFriendsData, updateFriendsData} from "./actions/friends";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import FriendItem from "./component/FriendItem";

const App = (props) => {
    const [name, setName] = useState('')
    const [searchName, setSearchName] = useState('')
    const [notification, setNotification] = useState(undefined)

    useEffect(() => {
        props.loadFriendsData()
    }, [])

    let {data = {}} = props
    let {friendsData = {}, friendsDataDuplicate = {}} = data
    let {listData} = friendsData
    let {listData: listDataDuplicate} = friendsDataDuplicate

    const onEnterClick = (e) => {
        e.preventDefault()
        let data = {
            id: listData.length + 1,
            name: name,
            favorite: false,
            deleted: false
        }
        listData.push(data)
        props.updateFriendsData(friendsData, true)
        setName('')
    }

    const onKeyPressInput = (e) => {
        if (e.key === 'Enter') {
            onEnterClick(e)
        }
    }

    const onOperationClick = (operation, id = '') => {
        setNotification(undefined)
        if (operation === 'favorite') {
            let list = []
            listData.forEach(item => {
                if (item.id === id) {
                    list.push({...item, favorite: !item.favorite})
                } else {
                    list.push(item)
                }
            })
            props.updateFriendsData({listData: list}, true)
        } else if (operation === 'delete') {
            let list = []
            listData.forEach(item => {
                if (item.id === id) {
                    list.push({...item, deleted: true})
                } else {
                    list.push(item)
                }
            })
            if (window.confirm('Are you sure you want to delete this friend?'))
                props.updateFriendsData({listData: list}, true)
        } else if (operation === 'search') {
            let list = []
            listData.forEach(item => {
                if (item.name.toString().toLowerCase() === searchName.toString().toLowerCase()) {
                    list.push(item)
                }
            })
            if (list.length !== 0) {
                props.updateFriendsData({listData: list}, false)
            } else {
                setNotification('No Matching Values')
            }
        }
    }

    const onFavoriteClick = (e) => {
        e.preventDefault();
        let listFavorite = listData.filter(item => item.favorite)
        let listFavoriteNot = listData.filter(item => !item.favorite)
        props.updateFriendsData({listData: [...listFavorite, ...listFavoriteNot]}, true)
    }

    const onSearchChange = (value) => {
        if (value === '') {
            props.updateFriendsData({listData: listDataDuplicate}, false)
        }
        setSearchName(value)
    }

    return (
        <div className={'col d-flex justify-content-center'}>
            <div className="card border-dark mr-5 ml-5 mb-3 mt-3" style={{width: '600px'}}>
                <div className="card-header font-weight-bold">Friends List</div>
                <div className="card-body">
                    <div className={'col-sm-12 row card-title'}>
                        <div className={'col-sm-10'}>
                            <input type="text" className="form-control" placeholder="Enter your Friend's name"
                                   value={name}
                                   id={"enterName"}
                                   onKeyPress={(e) => onKeyPressInput(e)}
                                   onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className={'col-sm-2'}>
                            <button type="button" className="btn btn-primary"
                                    id={'submit'}
                                    onClick={(e) => onEnterClick(e)}>
                                Submit
                            </button>
                        </div>
                    </div>
                    <div className={'col-sm-12 row'}>
                        <div className={'col-sm-6'}>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search By Name"
                                       value={searchName}
                                       id={'searchName'}
                                       onChange={(e) => onSearchChange(e.target.value)}/>
                                <div className="input-group-append">
                                    <button className="btn btn-secondary" type="button"
                                            id={'searchNameClick'}
                                            onClick={() => onOperationClick('search')}>
                                        <i className="fa fa-search"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={'col-sm-6'}>
                            <button type="button" className="btn btn-light" id="onFavoriteClick" onClick={e => onFavoriteClick(e)}>Sort By
                                Favorite
                            </button>
                        </div>
                    </div>

                    {notification && <div className="alert alert-success mt-2 col-sm-12" role="alert" >
                        <span id={'notification'}>{notification}</span>
                    </div>}
                    <div className="card-text mt-2 col-sm-12">
                        {listData && listData.map((item) => {
                            if (!item.deleted) {
                                return (
                                    <FriendItem {...item} onOperationClick={onOperationClick}/>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>

    );
}

const mapStateToProps = (state) => {
    return ({
        data: state.friends
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        loadFriendsData: bindActionCreators(loadFriendsData, dispatch),
        updateFriendsData: bindActionCreators(updateFriendsData, dispatch),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
