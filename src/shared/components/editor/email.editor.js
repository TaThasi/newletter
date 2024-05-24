'use client';

import dynamic from 'next/dynamic';
import React, { useRef, useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import DefaultJsonData from '@/assets/fonts/mails/default';

import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
export default function Emaileditor({ subjectTitle }) {
    const [loading, setLoading] = useState(false);
    const [jsonData, setJsonData] = useState(DefaultJsonData);
    const { user } = useUser();
    const emailEditorRef = useRef(null);
    const router = useRouter();

    const exportHtml = () => {
        if (emailEditorRef.current) {
            const unlayer = emailEditorRef.current.editor;

            unlayer?.exportHtml(async (data) => {
                const { design, html } = data;
                setJsonData(design);
                // Uncomment the following lines to send email
                // await sendEmail({
                //     userEmail: ["sponsorship@becodemy.com"],
                //     subject: subjectTitle,
                //     content: html,
                // }).then((res) => {
                //     toast.success("Email sent successfully!");
                //     router.push("/dashboard/write");
                // });
            });
        }
    };

    useEffect(() => {
        // getEmailDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const onLoad = () => {
        emailEditorRef.current?.editor.loadDesign(jsonData);
    };

    const onReady = () => {
        console.log("onReady");
    };

    return (
        <>
            {!loading && (
                <div className='w-full h-[90vh] relative'>
                    {typeof window !== 'undefined' && (
                        <EmailEditor ref={emailEditorRef} minHeight={"80vh"} onReady={onReady} onLoad={onLoad} />
                    )}
                </div>
            )}
        </>
    );
}
