import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'

export default class BasicDemo extends React.Component {
  state = {
    editorState: BraftEditor.createEditorState(''), // 设置编辑器初始内容
    outputHTML: '',
  }

  componentDidMount() {
    this.isLivinig = true
    // 3秒后更改编辑器内容
    setTimeout(this.setEditorContentAsync, 3000)
  }

  componentWillUnmount() {
    this.isLivinig = false
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML(),
    })
  }

  setEditorContentAsync = () => {
    this.isLivinig &&
      this.setState({
        editorState: BraftEditor.createEditorState(''),
      })
  }

  render() {
    const { editorState, outputHTML } = this.state

    return (
      <>
        <div className="editor-wrapper">
          <BraftEditor
            language="en"
            value={editorState}
            onChange={this.handleChange}
          />
        </div>
        <h5 className="bg-red-500 text-white text-center p-4">
          NỘI DUNG ĐƯỢC HIỂN THỊ BÊN DƯỚI
        </h5>
        <div dangerouslySetInnerHTML={{ __html: outputHTML }}></div>
      </>
    )
  }
}