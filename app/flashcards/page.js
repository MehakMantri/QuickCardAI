import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { collection, doc, getDocs } from 'firebase/firestore';
import { useSearchParams, useRouter } from 'next/navigation';
import { db } from '../firebase'; // Assume you have set up Firestore
import { Container, Grid, Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const searchParams = useSearchParams();
  const search = searchParams.get('id');
  const router = useRouter();

  // Fetch flashcards from Firestore
  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;

      const colRef = collection(doc(collection(db, 'users'), user.id), search);
      const docs = await getDocs(colRef);
      const flashcards = [];
      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });
      setFlashcards(flashcards);
    }
    getFlashcard();
  }, [search, user]);

  // Handle card flip
  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard) => (
          <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(flashcard.id)}>
                <CardContent>
                  <Box sx={{
                    perspective: '1000px',
                    transition: 'transform 0.6s',
                    transformStyle: 'preserve-3d',
                    transform: flipped[flashcard.id] ? 'rotateY(180deg)' : 'none',
                  }}>
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      textAlign: 'center',
                      transition: 'transform 0.6s',
                      transformStyle: 'preserve-3d',
                      transform: flipped[flashcard.id] ? 'rotateY(180deg)' : 'none',
                    }}>
                      <div style={{
                        position: 'absolute',
                        backfaceVisibility: 'hidden',
                        width: '100%',
                        height: '100%',
                      }}>
                        <Typography variant="h5" component="div">
                          {flashcard.front}
                        </Typography>
                      </div>
                      <div style={{
                        position: 'absolute',
                        backfaceVisibility: 'hidden',
                        width: '100%',
                        height: '100%',
                        transform: 'rotateY(180deg)',
                      }}>
                        <Typography variant="h5" component="div">
                          {flashcard.back}
                        </Typography>
                      </div>
                    </div>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
