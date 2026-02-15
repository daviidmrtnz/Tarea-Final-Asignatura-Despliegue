<?php
namespace App\Controller;
use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ApiController extends AbstractController {
    #[Route('/api/products', name: 'api_products', methods: ['GET'])]
    public function getProducts(EntityManagerInterface $em): JsonResponse {
        $repository = $em->getRepository(Product::class);
        $products = $repository->findAll();

        if (empty($products)) { // Si está vacío, creamos un producto de prueba
            $product = new Product();
            $product->setName('Producto Demo - ' . rand(100, 999));
            $em->persist($product);
            $em->flush();
            $products[] = $product;
        }

        $data = [];
        foreach ($products as $p) { $data[] = ['id' => $p->getId(), 'name' => $p->getName()]; }
        return $this->json($data);
    }
}
