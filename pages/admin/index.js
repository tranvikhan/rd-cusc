import React, { Component } from 'react'
import dynamic from 'next/dynamic'
const Editor = dynamic(() => import('../../components/Editor.tsx'), {
  ssr: false,
})

const Index = () => {
  return <Editor />
}

export default Index
