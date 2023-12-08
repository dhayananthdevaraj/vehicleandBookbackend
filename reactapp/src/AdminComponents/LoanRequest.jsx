import React, { useState, useEffect } from 'react';
import './LoanRequest.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoanRequests = () => {
    const [loanRequests, setLoanRequests] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [sortValue, setSortValue] = useState(0);
    const [statusFilter, setStatusFilter] = useState("-1");
    const [page, setPage] = useState(1);
    const [pagesize, setPagesize] = useState(2);
    const [maxPageLength, setMaxPageLength] = useState(0);
    const [expandedRow, setExpandedRow] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [searchValue, statusFilter, page, sortValue, pagesize]);

    async function fetchData() {
        try {
            const response = await axios.post('https://8080-abfdabeabcbaedbbdbffcedacbfdaeffdedfbedfefba.premiumproject.examly.io/loanApplication/getAllLoanApplications', {
                searchValue: searchValue,
                statusFilter: statusFilter,
                page: page,
                sortValue: sortValue,
                pageSize: pagesize
            });
            console.log("response.data", response.data);
            setLoanRequests(response.data.data);
            setMaxPageLength(Math.ceil(response.data.length / pagesize));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const handleSearchChange = (e) => {
        const inputValue = e.target.value;
        setSearchValue(inputValue);
    };

    const toggleSort = (order) => {
        setSortValue(order);
    };

    const handleFilterChange = (e) => {
        const selectedStatus = e.target.value;
        setStatusFilter(selectedStatus);
    };

    const handleApprove = async (id, userName, userId) => {
        let updatedRequest = {};
        loanRequests.forEach((request) => {
            if (request.loanApplicationID === id) {
                updatedRequest = request;
            }
        });
        let requestObject = {
            "loanStatus": 1
        };

        try {
            const response = await axios.put(
                `https://8080-abfdabeabcbaedbbdbffcedacbfdaeffdedfbedfefba.premiumproject.examly.io/loanApplication/updateLoanApplication/${id}`,
                requestObject
            );
            console.log("response", response);
            if (response.status === 200) {
                fetchData();
            }
        } catch (error) {
            console.error("Error approving request:", error);
        }
    };

    const handleReject = async (id, userName, userId) => {
        let updatedRequest = {};
        loanRequests.forEach((request) => {
            if (request.loanApplicationID === id) {
                updatedRequest = request;
            }
        });

        let requestObject = {
            "loanStatus": 2
        };

        try {
            const response = await axios.put(
                `https://8080-abfdabeabcbaedbbdbffcedacbfdaeffdedfbedfefba.premiumproject.examly.io/loanApplication/updateLoanApplication/${id}`,
                requestObject
            );
            if (response.status === 200) {
                fetchData();
            }
        } catch (error) {
            console.error("Error rejecting request:", error);
        }
    };

    const handleRowExpand = (index) => {
        const selected = loanRequests[index];
        setExpandedRow(expandedRow === index ? null : index);
        setSelectedLoan(selected);
        setShowModal(!showModal);
    };

    const LoanDetailsModal = ({ loan, onClose }) => {
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <button onClick={onClose} className="modal-close-button">
                        Close
                    </button>
                    <div className="address-details">
                        <div>
                            Address: {loan.address}</div>

                        <div>    <div>Proof:</div>                      <img src={loan.file} alt="Loan Image" style={{ height: '300px', width: '300px' }} />
                        </div>                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <button onClick={() => navigate(-1)} id='backButton'>Back</button>
            <h1>Loan Requests for Approval</h1>
            <div>
                <input
                    id='searchBox'
                    type="text"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={handleSearchChange}
                />
                <label id='filter'>
                    Filter by Status:
                    <select
                        value={statusFilter}
                        onChange={handleFilterChange}
                    >
                        <option value="-1">All</option>
                        <option value="0">Pending</option>
                        <option value="1">Approved</option>
                        <option value="2">Rejected</option>
                    </select>
                </label>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Loan Type</th>
                        <th>Model</th>
                        <th>
                            <div id="submissionDate">
                                Submission Date
                                <div
                                    className="sortButtons"
                                    onClick={() => toggleSort(1)}
                                >
                                    ⬆️
                                </div>
                                <div
                                    className="sortButtons"
                                    onClick={() => toggleSort(-1)}
                                >
                                    ⬇️
                                </div>
                            </div>
                        </th>
                        <th>purchasePrice</th>
                        <th>Income</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {loanRequests.length ? <tbody>
                    {loanRequests
                        .map((request, index) => (
                            <React.Fragment key={request._id}>
                                <tr>
                                    <td>{request.userName}</td>
                                    <td>{request.loanType}</td>
                                    <td>{new Date(request.model).toLocaleDateString()}</td>
                                    <td>{new Date(request.submissionDate).toLocaleDateString()}</td>
                                    <td>${request.purchasePrice}</td>
                                    <td>${request.income}</td>
                                    <td>
                                        {request.loanStatus === 0
                                            ? "Pending"
                                            : request.loanStatus === 1
                                                ? "Approved"
                                                : "Rejected"}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleRowExpand(index)}
                                        >

                                            Show More                    </button>

                                        {(request.loanStatus === 0 || request.loanStatus === 2) && (
                                            <button
                                                onClick={() => handleApprove(request._id, request.userName, request.userId)}
                                            >
                                                Approve
                                            </button>
                                        )}
                                        {(request.loanStatus === 0 || request.loanStatus === 1) && (
                                            <button
                                                onClick={() => handleReject(request._id, request.userName, request.userId)}
                                            >
                                                Reject
                                            </button>
                                        )}
                                    </td>
                                </tr>
                                {showModal && (
                                    <tr>
                                        <td colSpan="8">
                                            <LoanDetailsModal loan={selectedLoan} onClose={() => setShowModal(false)} />
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                </tbody> : (
                    <tbody>
                        <tr>
                            <td colSpan={9} className="no-records-cell">
                                Oops! No records Found
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
            {loanRequests.length ? <div>
                <button onClick={() => setPage(page - 1)} disabled={page == 1 ? true : false}>
                    Prev
                </button>
                <span>
                    Page {page} of {maxPageLength === 0 ? 1 : maxPageLength}
                </span>
                <button onClick={() => setPage(page + 1)} disabled={page == maxPageLength ? true : false} >
                    Next
                </button>
            </div> : ""}
        </div>
    );
};

export default LoanRequests;
