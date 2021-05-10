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
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
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
        <Container>
          <div className="editor-wrapper">
            <BraftEditor
              language="en"
              value={editorState}
              onChange={this.handleChange}
              extendControls={extendControls}
            />
          </div>
        </Container>

        <h5 className="bg-red-500 text-white text-center p-4">
          NỘI DUNG ĐƯỢC HIỂN THỊ BÊN DƯỚI
        </h5>
        <Container>
          <div
            className="braft-output-content"
            dangerouslySetInnerHTML={{ __html: outputHTML }}
          ></div>
        </Container>
        <h5 className="bg-red-500 text-white text-center p-4">HTML</h5>
        <Container>
          <div> {outputHTML}</div>
          {}
        </Container>
      </>
    )
  }
}
