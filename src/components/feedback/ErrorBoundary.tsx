import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { AppTheme } from '@/theme/tokens';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Enterprise Error Boundary
 * Catches any unhandled JavaScript exceptions in the React Component Tree
 * and displays a graceful fallback UI instead of crashing the entire app.
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // In a real enterprise app, we would log this to Sentry, Crashlytics, or Datadog here.
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Surface style={styles.container}>
          <View style={styles.content}>
            <Text variant="displaySmall" style={styles.title}>
              System Failure
            </Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
              An unexpected error occurred in the application matrix.
            </Text>
            
            {this.state.error && (
              <Surface style={styles.errorContainer} elevation={1}>
                <Text variant="bodyMedium" style={styles.errorText}>
                  {this.state.error.toString()}
                </Text>
              </Surface>
            )}

            <Button 
              mode="contained" 
              onPress={this.handleReset}
              style={styles.button}
            >
              Reboot System
            </Button>
          </View>
        </Surface>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 24,
    alignItems: 'center',
    maxWidth: 400,
  },
  title: {
    color: AppTheme.colors.error,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    color: AppTheme.colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: 32,
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 50, 50, 0.1)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 32,
    width: '100%',
  },
  errorText: {
    color: AppTheme.colors.error,
    fontFamily: 'monospace',
    fontSize: 12,
  },
  button: {
    width: '100%',
    paddingVertical: 8,
  },
});
