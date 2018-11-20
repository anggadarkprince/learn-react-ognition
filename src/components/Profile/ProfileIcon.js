import React from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

class ProfileIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className={'mr2'}>
                <DropdownToggle tag="div" data-toggle="dropdown">
                    <div className='tc'>
                        <img src='http://tachyons.io/img/logo.jpg' className='br-100 ba dib mt2'
                             style={{width: '2.8rem', height: '2.8rem'}} alt='Profile Icon'/>
                    </div>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem header>Action</DropdownItem>
                    <DropdownItem onClick={this.props.toggleModal}>My Profile</DropdownItem>
                    <DropdownItem onClick={() => this.props.onRouteChange('about')}>About</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem onClick={() => this.props.onRouteChange('signout')}>Sign Out</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }
}

export default ProfileIcon;