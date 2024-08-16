import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home-style.css'; 
import appImg from "../assets/blue-icon.png";

const Home = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [hoveredUser, setHoveredUser] = useState(null);

    useEffect(() => {
        fetch(`https://reqres.in/api/users?page=${page}`)
            .then(response => response.json())
            .then(data => {
                setUsers(data.data);
                setTotalPages(data.total_pages);
            });
    }, [page]);

    const filteredUsers = users.filter(user =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container">
            <div className="header">
                <h1>User List</h1>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="⌕ Search by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="content">
                <aside className="profile-highlight">
                    {hoveredUser ? (
                        <div className="profile">
                            <img src={hoveredUser.avatar} alt={hoveredUser.first_name} />
                            <h2>{hoveredUser.first_name} {hoveredUser.last_name}</h2>
                            <p>Email: {hoveredUser.email}</p>
                        </div>
                    ) : (
                        <div className="profile">
                            <img src={appImg} alt="Highlight Profile" />
                            <h2><i>Highlight Profile</i></h2>
                            <p className="description"><i>Hover over a profile to see more details.</i></p>
                        </div>
                    )}
                </aside>

                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Image Profile</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Title</th>
                                <th>Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr 
                                    key={user.id} 
                                    onMouseEnter={() => setHoveredUser(user)}
                                    onMouseLeave={() => setHoveredUser(null)}
                                >
                                    <td><img src={user.avatar} alt={user.first_name} style={{ width: '40px', borderRadius: '50%' }} /></td>
                                    <td>{user.first_name} {user.last_name}</td>
                                    <td>{user.created_at || 'N/A'}</td>
                                    <td>{user.title || 'N/A'}</td>
                                    <td>
                                        <Link to={`/detail-user/${user.id}`} className="action-btn">Detail</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="pagination">
                <button onClick={() => setPage(page => Math.max(page - 1, 1))} disabled={page === 1}>
                ⇦ Previous
                </button>
                <button 
                    className='next' 
                    onClick={() => setPage(page => page + 1)} 
                    disabled={page === totalPages}
                >
                    Next ⇨
                </button>
            </div>
        </div>
    );
};

export default Home;
