import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('./email.editor'), {
    ssr: false
});

const IndexPageEmailEditor = ({subjectTitle}) => {
  return <Editor subjectTitle={subjectTitle}/>;
};


export default IndexPageEmailEditor;