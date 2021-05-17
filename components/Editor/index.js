import 'braft-editor/dist/index.css'
import 'braft-editor/dist/output.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import Container from '../Layout/container'

export default class BasicDemo extends React.Component {
  state = {
    editorState: BraftEditor.createEditorState(''), // 设置编辑器初始内容
    outputHTML: '',
  }

  componentDidMount() {
    this.isLivinig = true
    setTimeout(this.setEditorContentAsync, 0)
    /// time
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
  preview = () => {
    if (window.previewWindow) {
      window.previewWindow.close()
    }

    window.previewWindow = window.open()
    window.previewWindow.document.write(this.buildPreviewHtml())
    window.previewWindow.document.close()
  }

  buildPreviewHtml() {
    return `
      <!Doctype html>
      <html>
        <head>
          <title>Bản xem trước nội dung</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
              font-family: 'Inter', 'sans-serif';
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${this.state.editorState.toHTML()}</div>
        </body>
      </html>
    `
  }

  render() {
    const { editorState, outputHTML } = this.state
    const extendControls = [
      {
        key: 'custom-button',
        type: 'button',
        text: 'Preview',
        onClick: this.preview,
      },
    ]

    return (
      <>
        <div className="editor-wrapper bo">
          <BraftEditor
            language="en"
            value={editorState}
            onChange={this.handleChange}
            extendControls={extendControls}
          />
        </div>
      </>
    )
  }
}
