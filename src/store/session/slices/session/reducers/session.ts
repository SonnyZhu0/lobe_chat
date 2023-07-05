import { produce } from 'immer';

import { ChatMessageMap } from '@/types/chatMessage';
import { MetaData } from '@/types/meta';
import { LobeAgentSession, LobeSessions } from '@/types/session';

/**
 * @title 添加会话
 */
interface AddSession {
  /**
   * @param session - 会话信息
   */
  session: LobeAgentSession;
  /**
   * @param type - 操作类型
   * @default 'addChat'
   */
  type: 'addSession';
}

interface RemoveSession {
  id: string;
  type: 'removeSession';
}

/**
 * @title 更新会话聊天上下文
 */
interface UpdateSessionChat {
  chats: ChatMessageMap;
  /**
   * 会话 ID
   */
  id: string;

  type: 'updateSessionChat';
}

interface UpdateSessionMeta {
  id: string;
  key: keyof MetaData;
  type: 'updateSessionMeta';
  value: any;
}

export type SessionDispatch = AddSession | UpdateSessionChat | RemoveSession | UpdateSessionMeta;

export const sessionsReducer = (state: LobeSessions, payload: SessionDispatch): LobeSessions => {
  switch (payload.type) {
    case 'addSession': {
      return produce(state, (draft) => {
        draft[payload.session.id] = payload.session;
      });
    }

    case 'removeSession': {
      return produce(state, (draft) => {
        delete draft[payload.id];
      });
    }

    case 'updateSessionMeta': {
      return produce(state, (draft) => {
        const chat = draft[payload.id];
        if (!chat) return;

        const { key, value } = payload;

        chat.meta[key] = value;
      });
    }

    case 'updateSessionChat': {
      return produce(state, (draft) => {
        const chat = draft[payload.id];
        if (!chat) return;

        chat.chats = payload.chats;
      });
    }

    default: {
      return produce(state, () => {});
    }
  }
};
