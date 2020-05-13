import { h } from 'preact';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import ThreeDotsIcon from 'images/three-dots.svg';
import { adjustTimestamp } from './util';
import ErrorMessage from './messages/errorMessage';

const Message = ({
  currentUserId,
  id,
  user,
  userID,
  message,
  color,
  type,
  editedAt,
  timestamp,
  profileImageUrl,
  onContentTrigger,
  onDeleteMessageTrigger,
  onEditMessageTrigger,
}) => {
  const spanStyle = { color };

  if (type === 'error') {
    return <ErrorMessage message={message} />;
  }

  const messageArea = (
    <span
      className="chatmessagebody__message"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: message }}
    />
  );

  const ENTER_KEY_CODE = 13;
  const dropdown = (
    <div className="message__actions">
      <span className="ellipsis__menubutton">
        <img src={ThreeDotsIcon} alt="dropdown menu icon" />
      </span>

      <div className="messagebody__dropdownmenu">
        <span
          role="button"
          data-content={id}
          onClick={onEditMessageTrigger}
          tabIndex="0"
          onKeyUp={(e) => {
            if (e.keyCode === ENTER_KEY_CODE) onEditMessageTrigger();
          }}
        >
          Edit
        </span>
        <span
          role="button"
          data-content={id}
          onClick={onDeleteMessageTrigger}
          tabIndex="0"
          onKeyUp={(e) => {
            if (e.keyCode === ENTER_KEY_CODE) onDeleteMessageTrigger();
          }}
        >
          Delete
        </span>
      </div>
    </div>
  );

  return (
    <div className="chatmessage">
      <div className="chatmessage__profilepic">
        <a
          href={`/${user}`}
          target="_blank"
          rel="noopener noreferrer"
          data-content="sidecar-user"
          onClick={onContentTrigger}
        >
          <img
            role="presentation"
            className="chatmessagebody__profileimage"
            src={profileImageUrl}
            alt={`${user} profile`}
            data-content="sidecar-user"
            onClick={onContentTrigger}
          />
        </a>
      </div>
      <div
        role="presentation"
        className="chatmessage__body"
        onClick={onContentTrigger}
      >
        <div className="message__info__actions">
          <div className="message__info">
            <span
              className="chatmessagebody__username not-dark-theme-text-compatible"
              style={spanStyle}
            >
              <a
                className="chatmessagebody__username--link"
                href={`/${user}`}
                target="_blank"
                rel="noopener noreferrer"
                data-content="sidecar-user"
                onClick={onContentTrigger}
              >
                {user}
              </a>
            </span>
            {editedAt ? (
              <span className="chatmessage__timestamp edited_message">
                {`${adjustTimestamp(editedAt)}`}
                <i> (edited)</i>
              </span>
            ) : (
              ' '
            )}

            {timestamp && !editedAt ? (
              <span className="chatmessage__timestamp">
                {`${adjustTimestamp(timestamp)}`}
              </span>
            ) : (
              ' '
            )}
          </div>
          {userID === currentUserId ? dropdown : ' '}
        </div>
        <div className="chatmessage__bodytext">{messageArea}</div>
      </div>
    </div>
  );
};

Message.propTypes = {
  currentUserId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired,
  userID: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
  timestamp: PropTypes.string,
  editedAt: PropTypes.number.isRequired,
  profileImageUrl: PropTypes.string,
  onContentTrigger: PropTypes.func.isRequired,
  onDeleteMessageTrigger: PropTypes.func.isRequired,
  onEditMessageTrigger: PropTypes.func.isRequired,
};

Message.defaultProps = {
  type: 'normalMessage',
  timestamp: null,
  profileImageUrl: '',
};

export default Message;
