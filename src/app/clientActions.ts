"use client";

export async function createRecoBook(userId: number, productId: number) {
  try {
    const res = await fetch(
      `http://${process.env.REC_URL}:${process.env.REC_PORT}/recommendations/book/${userId}/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      return {
        _t: "error",
        error: `Response error: ${res.ok}`,
      };
    }
    const result = await res.json();
    return {
      _t: "success",
      res: result,
    };
  } catch (error) {
    console.error(error);
    return {
      _t: "error",
      error: `Response error: ${error}`,
    };
  }
}
