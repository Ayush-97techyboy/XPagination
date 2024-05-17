import React, { useState, useEffect } from "react";
import styles from './XPagination.module.css';

const App = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setMembers(data))
      .catch((error) => alert("Failed to fetch data"));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = members.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(members.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.mainDiv}>
      <h1>Employee Data Table</h1>
      <table className={styles.tbHead}>
        <thead className={styles.hrow}>
          <tr >
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div >
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button>{currentPage}</button>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(members.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
