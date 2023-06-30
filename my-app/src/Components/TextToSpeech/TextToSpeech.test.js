import { render, screen, fireEvent } from '@testing-library/react';
import TextToSpeech from './TextToSpeech';

describe('TextToSpeech', () => {
  test('renders the speech button', () => {
    render(<TextToSpeech />);
    const speechButton = screen.getByRole('button', { name: 'pi pi-volume-up' });
    expect(speechButton).toBeInTheDocument();
  });

  test('speak the provided text when the speech button is clicked', () => {
    const speechMock = jest.fn();
    global.speechSynthesis = {
      speak: speechMock,
      cancel: jest.fn(),
      getVoices: jest.fn().mockReturnValue([]),
    };
    render(<TextToSpeech speech="Hello World" />);
    const speechButton = screen.getByRole('button', { name: 'pi pi-volume-up' });
    fireEvent.click(speechButton);
    expect(speechMock).toHaveBeenCalledTimes(1);
    expect(speechMock).toHaveBeenCalledWith(expect.objectContaining({ text: 'Hello World' }));
  });

  test('pauses the speech when the speech button is clicked while speaking', () => {
    const pauseMock = jest.fn();
    global.speechSynthesis = {
      speak: jest.fn(),
      cancel: jest.fn(),
      pause: pauseMock,
      resume: jest.fn(),
      speaking: true,
      getVoices: jest.fn().mockReturnValue([]),
    };
    render(<TextToSpeech speech="Hello World" />);
    const speechButton = screen.getByRole('button', { name: 'pi pi-volume-up' });
    fireEvent.click(speechButton);
    expect(pauseMock).toHaveBeenCalledTimes(1);
  });

  test('resumes the speech when the speech button is clicked while paused', () => {
    const resumeMock = jest.fn();
    global.speechSynthesis = {
      speak: jest.fn(),
      cancel: jest.fn(),
      pause: jest.fn(),
      resume: resumeMock,
      speaking: true,
      getVoices: jest.fn().mockReturnValue([]),
    };
    render(<TextToSpeech speech="Hello World" />);
    const speechButton = screen.getByRole('button', { name: 'pi pi-volume-up' });
    fireEvent.click(speechButton);
    expect(resumeMock).toHaveBeenCalledTimes(1);
  });

  test('does not speak when the speech button is clicked and no voices are available', () => {
    global.speechSynthesis = {
      speak: jest.fn(),
      cancel: jest.fn(),
      getVoices: jest.fn().mockReturnValue([]),
    };
    render(<TextToSpeech speech="Hello World" />);
    const speechButton = screen.getByRole('button', { name: 'pi pi-volume-up' });
    fireEvent.click(speechButton);
    expect(global.speechSynthesis.speak).not.toHaveBeenCalled();
  });
});
