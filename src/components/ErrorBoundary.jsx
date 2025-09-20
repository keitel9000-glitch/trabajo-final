import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, info: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    this.setState({ error, info })
    console.error('ErrorBoundary capturó un error:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="p-6">
          <h2 className="text-xl font-bold text-red-600">Ocurrió un error en la aplicación</h2>
          <p className="mt-2">{this.state.error && this.state.error.toString()}</p>
          <details className="mt-2 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
            {this.state.info && this.state.info.componentStack}
          </details>
          <div className="mt-4">
            <button onClick={() => window.location.reload()} className="px-3 py-2 bg-teal-600 text-white rounded">Recargar página</button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
