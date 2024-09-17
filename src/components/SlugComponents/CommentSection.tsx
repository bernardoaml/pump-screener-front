// src/components/CommentSection.tsx
import { useEffect, useState, useRef } from 'react';
import { fetchComments } from '@/services/api';
import { delay } from '@/services/utils'; 
import axios from 'axios';
import CommentItem from './CommentItem';

const CommentSection: React.FC<{ tokenAddress: string, creator: string }> = ({ tokenAddress, creator }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [userProfiles, setUserProfiles] = useState<Record<string, UserProfile>>({});
  const userProfileCache = useRef<Record<string, UserProfile>>({});

  useEffect(() => {
    const fetchData = async () => {
      // const commentsData = await fetchComments(tokenAddress);
      // setComments(commentsData);
      const commentsData = await axios.get("/api/replies", {
        params: {
          tokenAddress,
        },
      });
      setComments(commentsData.data);

      const uniqueUserIds = Array.from(new Set<string>(commentsData.data.map((comment: any) => comment.user)));

      for (const userId of uniqueUserIds) {
        if (!userProfileCache.current[userId]) {
          try {
            const response = await axios.get(`/api/users`, {
              params: {
                userId,
              }
            });
            userProfileCache.current[userId] = response.data;
            await delay(1000); // Adiciona um atraso de 1000ms entre as requisições
          } catch (error) {
            console.error(`Erro ao buscar o perfil do usuário ${userId}:`, error);
          }
        }
      }

      setUserProfiles({ ...userProfileCache.current });
    };

    fetchData();
  }, [tokenAddress]);

  return (
    <div>
      {comments.map(comment => {
        const userProfile = userProfiles[comment.user];
        const isCreator = comment.user === creator;
        return (
          <CommentItem key={comment.id} comment={comment} userProfile={userProfile} isCreator={isCreator} />
        );
      })}
    </div>
  );
};

export default CommentSection;
