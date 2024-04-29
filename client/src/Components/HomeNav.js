import React, { useContext, useState, useEffect, useRef } from 'react'
// import { useNavigate } from 'react-router-dom';
import { ContentContext } from '../Context/ContentProvider';
import { Context } from "../context";
import { addUserDoc } from '../Service/api';
import { DocNameContext } from '../Context/DocProvider';
import LoadingSpinner from "./LoadingSpinner";


function HomeNav({ id }) {
    const { user } = useContext(Context);
    // const {content, setContent} = useContext(ContentContext)
    const { docName, setDocName } = useContext(DocNameContext);
    const { content, setContent, quill, setQuill } = useContext(ContentContext)
    const quillRef = useRef(null);
    const [isLoadingP, setIsLoadingP] = useState(false);
    const [isLoadingS, setIsLoadingS] = useState(false);

    const submitCode = (e) => {
        e.preventDefault();
        window.open(`/room/${id}`, '_blank');
    };
    const logout = () => {
        window.open(`http://localhost:8080/auth/logout`, "_self");
    };
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const dropdown = document.getElementById('user-dropdown');

        const handleClickOutside = (event) => {
            if (dropdown && !dropdown.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const addUserDocFunction = async () => {
        try {
            if (user) {
                console.log(docName);
                await addUserDoc({ email: user.email, id: id, name: docName });
                setDocName("");
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        addUserDocFunction();
    }, [id]);

    const handleParaphraseClick = () => {

        const selectedText = content; // Get the selected text from the Quill editor

        if (selectedText) {
            setIsLoadingP(true);
            const text = selectedText.trim();
            console.log('I am inside the paraphraser click');
            fetch('http://127.0.0.1:5000/paraphrase', { // Add your flask endpoint
                method: 'POST',
                body: new URLSearchParams({
                    text: text,
                }),
            })
                .then((response) => response.text())
                .then((result) => {
                    const paraphrasedText = result; // Assuming the API returns the paraphrased text
                    console.log(paraphrasedText);
                    //quill.setContent(paraphrasedText);
                    quill.deleteText(0, selectedText.length);
                    quill.setText(paraphrasedText);
                    setIsLoadingP(false);
                    const length = paraphrasedText.length;
                    quill.setSelection(length);

                    console.log('I am out of para');

                })
                .catch((error) => {
                    console.error('Error:', error);
                    setIsLoadingP(false);
                });
        }

    };

    const handleSummarizeClick = () => {

        const selectedtext = content // Get the selected text
        if (selectedtext !== '') {
            setIsLoadingS(true);
            const text = selectedtext.trim();
            console.log('I am inside the summarizer click');
            console.log(text)
            fetch('http://127.0.0.1:5000/summarize', {
                method: 'POST',
                body: new URLSearchParams({
                    text: text,
                }),
            })
                .then((response) => response.text())
                .then((result) => {
                    const summary = result; // Assuming the API returns the summarized text
                    console.log("Summary:", summary);
                    console.log('I am out of summarizer');
                    quill.deleteText(0, selectedtext.length);
                    quill.setText(summary);
                    setIsLoadingS(false);

                    const length = summary.length;
                    quill.setSelection(length);

                    //setSummary(summary); // Update the state with the summarized text
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setIsLoadingS(false);
                });
        }
    }


    return (
        <nav className="!bg-[#600060] bg-opacity-30 fixed w-full z-20 top-0 left-0 sticky" >
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="http://localhost:3000" className="flex items-center">
                    <img src="../images/logo.png" className="h-10 mr-3" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">DocLab</span>
                </a>
                <div className="flex md:order-2">
                    <button type="button" className="flex mr-3 text-sm rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom" aria-expanded={isDropdownOpen ? 'true' : 'false'} onClick={toggleDropdown}>
                        <span className="sr-only">Open user menu</span>
                        <img className="w-8 h-8 rounded-full" src={user.picture} alt="user photo" />
                    </button>
                    {/* <!-- Dropdown menu --> */}
                    {isDropdownOpen && (
                        <div className="z-50 my-4 text-base list-none divide-y divide-gray-100 rounded-lg shadow absolute bg-black left-50 right-0 mt-10" id="user-dropdown">
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">{user.name}</span>
                                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{user.email}</span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <a href="http://localhost:3000/user-docs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={logout}>Sign out</a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="bitems-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700">
                        <li>
                            <a className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                <button onClick={handleParaphraseClick} className="hover:italic bg-blue-500 border:none hover:bg-white text-white hover:text-red-700 font-bold py-2 px-4 rounded-full transition ease-in-out duration-300">
                                    {isLoadingP ? <LoadingSpinner /> : 'Paraphrase'}
                                </button>
                            </a>
                        </li>
                        <li>
                            <a className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                <button onClick={handleSummarizeClick} className="hover:italic bg-blue-500 border:none hover:bg-white text-white hover:text-red-700 font-bold py-2 px-4 rounded-full transition ease-in-out duration-300">
                                    {isLoadingS ? <LoadingSpinner /> : 'Summarize'}
                                </button>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" onClick={submitCode}>
                                <button className="hover:italic bg-blue-500 border:none hover:bg-white text-white hover:text-red-700 font-bold py-2 px-4 rounded-full transition ease-in-out duration-300">
                                    Video Call
                                </button>
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
        </nav >

    )
}

export default HomeNav