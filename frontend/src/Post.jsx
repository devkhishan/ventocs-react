import React, { useState, useEffect } from 'react';
import { getUserName } from "../utils/api.js";
import Web3 from 'web3'
import Notification from './Notification.jsx';



const ERC20_CONTRACT_ADDRESS = '0x8A9442f0ee724bcD4E86d39BB993a1bB42BC4cbe';
const ERC20_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "initialOwner",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "allowance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientAllowance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientBalance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "approver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidApprover",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidReceiver",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSpender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const web3 = new Web3(window.ethereum);

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newPostContent, setNewPostContent] = useState('');
    const [creatingPost, setCreatingPost] = useState(false);
    const [comment, setComment] = useState('');
    const [activePostId, setActivePostId] = useState(null);
    const [userId, setUserId] = useState(localStorage.getItem('walletAddress'));
    const [donationAmount, setDonationAmount] = useState(0);
    const [erc20Contract, setErc20Contract] = useState(null);
    const [donatePostId, setDonatePostId] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification({ message: '', type: '' }), 3000); // Auto-hide after 3 seconds
    };


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/posts');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();

                if (result.success) {
                    setPosts(result.posts);
                } else {
                    setError('Failed to fetch posts');
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Error fetching posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();

        const contract = new web3.eth.Contract(ERC20_ABI, ERC20_CONTRACT_ADDRESS);
        setErc20Contract(contract);
    }, []);

    const handleCreatePost = async () => {
        setCreatingPost(true);

        try {
            const response = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: newPostContent,
                    creator: userId,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setPosts([result.post, ...posts]);
                setNewPostContent('');
            } else {
                showNotification('Failed to create post', 'error');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setCreatingPost(false);
        }
    };

    const handleUpvote = async (postId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/posts/${postId}/upvote`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });

            const result = await response.json();

            if (result.success) {
                setPosts(posts.map(post => post._id === postId ? result.post : post));
            } else {
                showNotification(result.message,'error');
            }
        } catch (error) {
            console.error('Error upvoting post:', error);
        }
    };

    const handleDownvote = async (postId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/posts/${postId}/downvote`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });

            const result = await response.json();

            if (result.success) {
                setPosts(posts.map(post => post._id === postId ? result.post : post));
            } else {
                showNotification(result.message,'error');
            }
        } catch (error) {
            console.error('Error downvoting post:', error);
        }
    };

    const handleComment = async (postId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: comment }),
            });

            const result = await response.json();

            if (result.success) {
                setPosts(posts.map(post => post._id === postId ? result.post : post));
                setComment('');
                setActivePostId(null);
            } else {
                showNotification('Failed to add comment', 'error');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleDonate = async (postId, creatorAddress) => {
        if (!donationAmount || isNaN(donationAmount) || Number(donationAmount) <= 0) {
            showNotification('Please enter a valid donation amount.','info');
            return;
        }

        if (creatorAddress.toLowerCase() === userId.toLowerCase()) {
            showNotification("You can't donate to yourself.",'info');
            return;
        }

        try {
            await erc20Contract.methods.transfer(creatorAddress, web3.utils.toWei(donationAmount, 'ether')).send({ from: userId });
            showNotification('Donation successful!','success');
            setDonationAmount(''); // Reset the donation amount
        } catch (error) {
            console.error('Error making donation:', error);
            showNotification('Donation failed. Please try again.','error');
        }
    };

    const toggleDonateForm = (postId) => {
        setDonatePostId(donatePostId === postId ? null : postId);
    };

    const toggleCommentForm = (postId) => {
        setActivePostId(activePostId === postId ? null : postId);
    };

    return (
        <div className="max-w-2xl mx-auto mt-8">
            {/* Create Post Section */}
            <div className="mb-4 bg-[#FFB000] p-4 rounded-lg shadow-md">
            <textarea
                placeholder="What's on your mind?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                rows="4"
                className="w-full p-2 rounded-lg bg-[#FFCC00] text-[#333] border border-[#FFB000] focus:ring-2 focus:ring-[#FFB000]"
            />
                <button
                    onClick={handleCreatePost}
                    disabled={creatingPost}
                    className="mt-2 w-full bg-[#FFB000] hover:bg-[#FFCC00] text-[#333] font-semibold py-2 px-4 rounded-lg border border-[#FFB000] focus:outline-none focus:ring-2 focus:ring-[#FFB000]"
                >
                    {creatingPost ? 'Creating...' : 'Create Post'}
                </button>
            </div>

            {/* Loading and Error Messages */}
            {loading && <p className="text-[#FFCC00]">Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {/* Posts List */}
            <div className="space-y-4">
                {posts.map((post) => (
                    <div key={post._id} className="bg-[#FFCC00] p-6 rounded-lg shadow-md border border-[#FFB000]">
                        <div className="flex justify-between items-center">
                            <span className="text-[#FFB000] font-semibold">{post.creator}</span>
                            <span className="text-[#FFB000] text-sm">{new Date(post.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-[#333] mt-4">{post.content}</p>
                        <div className="mt-4 flex items-center space-x-4">
                            <button
                                onClick={() => handleUpvote(post._id)}
                                className="bg-[#FFB000] hover:bg-[#FFCC00] text-[#333] font-semibold py-1 px-3 rounded-lg border border-[#FFB000] focus:outline-none focus:ring-2 focus:ring-[#FFB000]"
                            >
                                Upvote
                            </button>
                            <span className="text-[#333]">{post.upvotes} Upvotes</span>
                            <button
                                onClick={() => handleDownvote(post._id)}
                                className="bg-[#FFB000] hover:bg-[#FFCC00] text-[#333] font-semibold py-1 px-3 rounded-lg border border-[#FFB000] focus:outline-none focus:ring-2 focus:ring-[#FFB000]"
                            >
                                Downvote
                            </button>
                            <span className="text-[#333]">{post.downvotes} Downvotes</span>
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={() => toggleDonateForm(post._id)}
                                className="bg-[#FFB000] hover:bg-[#FFCC00] text-[#333] font-semibold py-1 px-3 rounded-lg border border-[#FFB000] mr-4 focus:outline-none focus:ring-2 focus:ring-[#FFB000]"
                            >
                                Donate
                            </button>
                            {donatePostId === post._id && (
                                <div>
                                    <input
                                        type="number"
                                        value={donationAmount}
                                        onChange={(e) => setDonationAmount(e.target.value)}
                                        placeholder="Enter amount"
                                        className="w-full p-2 rounded-lg bg-[#FFCC00] text-[#333] border border-[#FFB000] focus:ring-2 focus:ring-[#FFB000] mt-2"
                                    />
                                    <button
                                        onClick={() => handleDonate(post._id, post.creator)}
                                        className="mt-2 mb-5 w-full bg-[#FFB000] hover:bg-[#FFCC00] text-[#333] font-semibold py-2 px-4 rounded-lg border border-[#FFB000] focus:outline-none focus:ring-2 focus:ring-[#FFB000]"
                                    >
                                        Donate Now
                                    </button>
                                </div>
                            )}
                            <button
                                onClick={() => toggleCommentForm(post._id)}
                                className="bg-[#FFB000] hover:bg-[#FFCC00] text-[#333] font-semibold py-1 px-3 rounded-lg border border-[#FFB000] focus:outline-none focus:ring-2 focus:ring-[#FFB000]"
                            >
                                Add Comment
                            </button>
                            {activePostId === post._id && (
                                <div className="mt-2">
                                <textarea
                                    placeholder="Add a comment..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    rows="2"
                                    className="w-full p-2 rounded-lg bg-[#FFCC00] text-[#333] border border-[#FFB000] focus:ring-2 focus:ring-[#FFB000] mt-2"
                                />
                                    <button
                                        onClick={() => handleComment(post._id)}
                                        className="mt-2 w-full bg-[#FFB000] hover:bg-[#FFCC00] text-[#333] font-semibold py-2 px-4 rounded-lg border border-[#FFB000] focus:outline-none focus:ring-2 focus:ring-[#FFB000]"
                                    >
                                        Submit Comment
                                    </button>
                                </div>
                            )}
                            <div className="mt-4 space-y-2">
                                {post.comments.map((comment, index) => (
                                    <div key={index} className="bg-[#FFB000] p-3 rounded-lg border border-[#FFCC00]">
                                        <p className="text-[#333]">{comment.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {notification.message && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ message: '', type: '' })}
                />
            )}
        </div>
    );


};

export default Posts;
