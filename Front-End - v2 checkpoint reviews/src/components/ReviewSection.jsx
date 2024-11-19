import Review from './Review'

function ReviewSection() {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
        const response = await fetch(`https://localhost:7200/api/Review/Product/${id} `);
        const data = await response.json();
        setReviews(data);
    };

    fetchProduct();
  }, [id]);

  return (
    reviews.map((review) => {
      <Review 
        content = {review.content} 
        rating = {review.rating} 
        // userName = {review.userName} 
        date = {review.date}
      />
    })
  )
}

export default ReviewSection