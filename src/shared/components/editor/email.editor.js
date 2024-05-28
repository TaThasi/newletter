'use client';

import dynamic from 'next/dynamic';
import React, { useRef, useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import DefaultJsonData from '@/assets/fonts/mails/default';
import { Button } from '@nextui-org/react';
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import { saveEmail } from '@/actions/save.email';
import { GetEmailDetails } from '@/actions/get.mail-detail';
import { sendEmail } from '@/shared/utils/email.send';

export default function Emaileditor({ subjectTitle }) {
    const [loading, setLoading] = useState(true);
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
                await sendEmail({
                    userEmail: ["skyforce204@gmail.com"],
                    subject: subjectTitle,
                    content: html,
                }).then((res) => {
                    toast.success("Email sent successfully!");
                    router.push("/dashboard/write");
                })
                .catch((err) => {
                    console.log(err);
                })
            });
        }
    };

    useEffect(() => {
        getEmailDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const onLoad = () => {
        emailEditorRef.current?.editor.loadDesign(jsonData);
    };

    const onReady = () => {
        console.log("onReady");
    };


    const saveDraft = () => {
        const unplayer = emailEditorRef.current?.editor;
        unplayer?.exportHtml(async (data) => {
            const { design } = data;
            await saveEmail({
                title: subjectTitle,
                content: JSON.stringify(design),
                newsLetterOwnerId: user?.id
            })
            .then((res) => {
                toast.success("Email saved successfully!");
                router.push("/dashboard/write");
            })

        })   
    }
    
    const getEmailDetails = async () => {
        await GetEmailDetails({
            title: subjectTitle,
            newsLetterOwnerId: user?.id
        })
        .then((data) => {
            if(data) {
                setJsonData(JSON.parse(data?.content));
            }
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
        })
    };
    
    return (
        <>
            {!loading && (
                <div className='w-full h-[90vh] relative'>
                    {typeof window !== 'undefined' && (
                        <EmailEditor ref={emailEditorRef} minHeight={"80vh"} onReady={onReady} onLoad={onLoad} />
                    )}
                    <div className="absolute bottom-0 flex items-center justify-end gap-4 right-0 w-full border-t p-3">
                        <Button
                        className="bg-transparent cursor-pointer flex items-center gap-1 text-black border border-[#00000048] text-lg rounded-lg"
                        onClick={saveDraft}
                        >
                            <span className="opacity-[.7]">Save Draft</span>
                        </Button>
                        <Button
                        className="bg-[#000] text-white cursor-pointer flex items-center gap-1 border text-lg rounded-lg"
                        onClick={exportHtml}
                        >
                            <span>Send</span>
                        </Button>
                    </div>
                </div>
            )}
            
            
        </>
    );
}
