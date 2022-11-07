import styled from '@emotion/styled';
import React, {Dispatch, SetStateAction} from 'react';
import dynamic from 'next/dynamic';
import { EditorProps, EditorState } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Button from './Button';

const Editor = dynamic<EditorProps>(
    () => import('react-draft-wysiwyg').then(module => module.Editor),
    {
        ssr: false
    }
)

export default function CustomEditor({
    editorState,
    readOnly = false,
    onSave,
    onEditorStateChange
}
    : {
        editorState: EditorState,
        readOnly?: boolean,
        onSave?: () => void, // 저장할 때 동 작 
        onEditorStateChange?: Dispatch<SetStateAction<EditorState | undefined>>
    }) {
    return (
        <Wrapper className='wrapper'>
            <Editor
                readOnly={readOnly}
                editorState={editorState}
                toolbarHidden={readOnly}
                wrapperClassName="wrapper-class"
                toolbarClassName="editorToolbar-hidden"
                editorClassName="editor-class"
                toolbar={{
                    options: ['inline', 'list', 'textAlign', 'link']
                }}
                localization={{
                    locale: 'ko'
                }}
                onEditorStateChange={onEditorStateChange}
            />
            {!readOnly && <Button onClick={onSave}>Save</Button>}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 16px;
    height: 400px;
    width: 100vw;
`