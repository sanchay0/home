import { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import Custom404 from './404'
import { useAuth } from '../utils/authHandler'

export default function Admin() {
  const user = useAuth()
  const editorRef = useRef(null)

  const log = () => {
    if (editorRef.current) {
      // eslint-disable-next-line no-console
      console.log(editorRef.current.getContent())
    }
  }

  const notepad: JSX.Element = (
    <div className="mx-auto mt-16 max-w-7xl px-8 py-12">
    <Editor 
    id="editor"
    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
    onInit={ (e, editor) => { editorRef.current = editor }}
    init={{
      plugins: 'anchor autolink link lists image code advcode mergetags wordcount',
      toolbar: 'undo redo | blocks | bold italic strikethrough backcolor | mergetags | link image | align bullist numlist | code',
      height: 900,
    }}
    />
    <button className="mt-5" type="button" onClick={log}>Submit</button>
    </div>
  )

  if (user && user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return notepad
  }
  return <Custom404 />
}